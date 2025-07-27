<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn() => Inertia::render('Welcome'));
Route::get('/login', fn() => Inertia::render('Login'));
Route::get('/register', fn() => Inertia::render('Register'));
Route::get('/dashboard', fn() => Inertia::render('Dashboard'));
