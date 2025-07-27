<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class ApiSecurityMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Rate limiting untuk API
        $key = 'api-rate-limit:' . $request->ip();
        
        if (RateLimiter::tooManyAttempts($key, 60)) { // 60 requests per minute
            return response()->json([
                'error' => 'Too Many Requests',
                'message' => 'Terlalu banyak permintaan. Coba lagi dalam beberapa menit.',
                'retry_after' => RateLimiter::availableIn($key)
            ], 429);
        }
        
        RateLimiter::hit($key, 60); // 60 seconds window
        
        // Security headers
        $response = $next($request);
        
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Content-Security-Policy', "default-src 'self'");
        
        // Hapus header yang mengekspos informasi server
        $response->headers->remove('Server');
        $response->headers->remove('X-Powered-By');
        
        return $response;
    }
}