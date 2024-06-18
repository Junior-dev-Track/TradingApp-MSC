<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')->constrained()->onDelete('cascade');
            $table->string('symbol');
            $table->integer('quantity');
            $table->enum('type', ['market', 'limit', 'stop', 'buy_stop'])->default('market');
            $table->decimal('price', 10, 2)->nullable();
            $table->decimal('stop_price', 10, 2)->nullable();
            $table->decimal('buy_stop_price', 10, 2)->nullable();
            $table->timestamps();

            $table->index('profile_id');
            $table->index('symbol');
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
}
