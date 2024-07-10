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
        Schema::create('wires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')->constrained();
            $table->decimal('amount', 8, 2);
            $table->boolean('withdrawal');
            $table->timestamps();

            $table->index('profile_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wires');
    }
};
