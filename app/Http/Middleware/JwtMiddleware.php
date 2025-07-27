<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            // Cek apakah token ada di header Authorization
            $token = JWTAuth::parseToken();
            
            // Verifikasi token dan dapatkan user
            $user = JWTAuth::authenticate($token);
            
            if (!$user) {
                return response()->json([
                    'error' => 'User not found',
                    'message' => 'Token valid tapi user tidak ditemukan'
                ], 404);
            }
            
        } catch (TokenExpiredException $e) {
            return response()->json([
                'error' => 'Token expired',
                'message' => 'Token telah kedaluwarsa, silakan login ulang'
            ], 401);
            
        } catch (TokenInvalidException $e) {
            return response()->json([
                'error' => 'Token invalid',
                'message' => 'Token tidak valid'
            ], 401);
            
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'Token absent',
                'message' => 'Token tidak ditemukan dalam request'
            ], 401);
        }

        return $next($request);
    }
}