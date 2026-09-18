<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $employees = Employee::query()
            ->when($search, function ($query, $search) {
                $query->where('employee_id', 'like', "%{$search}%")
                    ->orWhere('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('position', 'like', "%{$search}%");
            })
            ->paginate(10)
            ->withQueryString();

        return inertia('Employees/Index', [
            'employees' => $employees,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return inertia('Employees/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|string|unique:employees,employee_id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email',
            'position' => 'required|string|max:255',
            'employment_type' => 'required|string|max:255',
            'basic_salary' => 'required|numeric|min:0',
            'status' => 'required|string',
        ]);

        Employee::create($validated);

        return redirect()->route('employees.index');
    }

    public function show(Employee $employee)
    {
        return inertia('Employees/Show', [
            'employee' => $employee,
        ]);
    }

    public function edit(Employee $employee)
    {
        return inertia('Employees/Edit', [
            'employee' => $employee,
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'employee_id' => 'required|string|unique:employees,employee_id,' . $employee->id,
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $employee->id,
            'position' => 'required|string|max:255',
            'employment_type' => 'required|string|max:255',
            'basic_salary' => 'required|numeric|min:0',
            'status' => 'required|string',
        ]);

        $employee->update($validated);

        return redirect()->route('employees.index');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index');
    }
}