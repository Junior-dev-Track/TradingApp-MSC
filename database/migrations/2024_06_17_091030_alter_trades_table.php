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
        Schema::table('trades', function (Blueprint $table) {
            // Make 'close_price' and 'close_datetime' nullable
            $table->decimal('close_price', 8, 2)->nullable()->change();
            $table->dateTime('close_datetime')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('trades', function (Blueprint $table) {
            // Revert 'close_price' and 'close_datetime' to not nullable
            $table->decimal('close_price', 8, 2)->nullable(false)->change();
            $table->dateTime('close_datetime')->nullable(false)->change();
        });
    }
};
