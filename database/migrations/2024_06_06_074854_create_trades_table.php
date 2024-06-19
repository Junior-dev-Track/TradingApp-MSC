<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')->constrained();
            $table->string('symbol');
            $table->integer('quantity');
            $table->decimal('open_price', 8, 2);
            $table->decimal('close_price', 8, 2)->nullable();
            $table->timestamp('open_datetime')->useCurrent();
            $table->timestamp('close_datetime')->nullable();
            $table->boolean('open')->default(false);
            $table->timestamp('updated_at')->useCurrent();

            // Indexes
            $table->index('profile_id');
            $table->index('close_datetime');
            $table->index('open');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trades');
    }
};
