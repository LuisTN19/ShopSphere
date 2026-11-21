<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'price',
        'old_price',
        'image_url',
        'tag',
        'stock',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
