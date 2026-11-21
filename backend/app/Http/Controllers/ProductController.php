<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::with('category')->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category->name,
                'price' => (float) $product->price,
                'old' => $product->old_price ? (float) $product->old_price : null,
                'img' => $product->image_url,
                'tag' => $product->tag,
                'stock' => $product->stock,
            ];
        });

        return response()->json($products);
    }
}
