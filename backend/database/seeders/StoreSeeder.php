<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fashion = Category::create([
            'name' => 'Fashion',
            'image_url' => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=650&q=80',
        ]);

        $electronics = Category::create([
            'name' => 'Electronics',
            'image_url' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=650&q=80',
        ]);

        $accessories = Category::create([
            'name' => 'Accessories',
            'image_url' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=650&q=80',
        ]);

        $lifestyle = Category::create([
            'name' => 'Lifestyle',
            'image_url' => 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=650&q=80',
        ]);

        $products = [
            ['category_id' => $fashion->id, 'name' => 'Everyday Canvas Tote', 'price' => 32, 'old_price' => 45, 'image_url' => 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=700&q=85', 'tag' => 'BESTSELLER', 'stock' => 15],
            ['category_id' => $electronics->id, 'name' => 'Wireless Studio Headphones', 'price' => 89, 'old_price' => 119, 'image_url' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85', 'tag' => 'HOT PICK', 'stock' => 10],
            ['category_id' => $accessories->id, 'name' => 'Minimalist Gold Watch', 'price' => 74, 'old_price' => 99, 'image_url' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85', 'tag' => 'NEW', 'stock' => 12],
            ['category_id' => $fashion->id, 'name' => 'Classic Everyday Sneakers', 'price' => 68, 'old_price' => 90, 'image_url' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85', 'tag' => 'POPULAR', 'stock' => 20],
            ['category_id' => $lifestyle->id, 'name' => 'Modern Ceramic Vase', 'price' => 38, 'old_price' => 50, 'image_url' => 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=85', 'tag' => 'NEW', 'stock' => 8],
            ['category_id' => $electronics->id, 'name' => 'Retro Instant Camera', 'price' => 125, 'old_price' => 149, 'image_url' => 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=85', 'tag' => 'TRENDING', 'stock' => 6],
            ['category_id' => $accessories->id, 'name' => 'Signature Sunglasses', 'price' => 46, 'old_price' => 60, 'image_url' => 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85', 'tag' => 'BESTSELLER', 'stock' => 25],
            ['category_id' => $fashion->id, 'name' => 'Soft Knit Sweater', 'price' => 54, 'old_price' => 72, 'image_url' => 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=85', 'tag' => 'COZY PICK', 'stock' => 18],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
