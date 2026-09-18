<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'employee_id',
        'first_name',
        'last_name',
        'email',
        'position',
        'employment_type',
        'basic_salary',
        'status',
    ];
}
