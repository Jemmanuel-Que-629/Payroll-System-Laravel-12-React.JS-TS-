import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface Employee {
    id: number;
    employee_id: string;
    first_name: string;
    last_name: string;
    email: string;
    position: string;
    employment_type: string;
    basic_salary: string;
    status: string;
}

interface EmployeePageProps {
    employees: {
        data: Employee[]
        current_page: number
        last_page: number
        per_page: number
        total: number
    }
    filters: {
        search: string
    }
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: '/employees',
    },
];

export default function Index({ employees }: EmployeePageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employees" />

            <div className="space-y-6 p-6">

                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Employees
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Manage your employees and their information.
                        </p>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus />
                                Add Employee
                            </Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Employee</DialogTitle>

                                <DialogDescription>
                                    Enter the employee information below.
                                </DialogDescription>
                            </DialogHeader>

                            {/* Employee form will go here */}
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search */}
                <div className="flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="w-80 rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                {/* Employee Table */}
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/40">
                                        <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                                            Employee ID
                                        </th>

                                        <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                                            Employee
                                        </th>

                                        <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                                            Position
                                        </th>

                                        <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                                            Employment Type
                                        </th>

                                        <th className="px-6 py-4 text-right font-medium text-muted-foreground">
                                            Basic Salary
                                        </th>

                                        <th className="px-6 py-4 text-center font-medium text-muted-foreground">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {employees.data.map((employee) => (
                                        <tr
                                            key={employee.id}
                                            className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-medium">
                                                {employee.employee_id}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="font-medium">
                                                    {employee.first_name}{' '}
                                                    {employee.last_name}
                                                </div>

                                                <div className="text-xs text-muted-foreground">
                                                    {employee.email}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-muted-foreground">
                                                {employee.position}
                                            </td>

                                            <td className="px-6 py-4 text-muted-foreground">
                                                {employee.employment_type}
                                            </td>

                                            <td className="px-6 py-4 text-right font-medium">
                                                ₱{Number(employee.basic_salary).toLocaleString(
                                                    'en-PH',
                                                    {
                                                        minimumFractionDigits: 2,
                                                    }
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={
                                                        employee.status === 'active'
                                                            ? 'inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700'
                                                            : 'inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600'
                                                    }
                                                >
                                                    {employee.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing page {employees.current_page} of {employees.last_page}
                    </p>

                    <div className="flex items-center gap-2">
                        {employees.current_page > 1 && (
                            <Link
                                href={`/employees?page=${employees.current_page - 1}`}
                                className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
                            >
                                Previous
                            </Link>
                        )}

                        {Array.from(
                            { length: employees.last_page },
                            (_, index) => index + 1
                        ).map((page) => (
                            <Link
                                key={page}
                                href={`/employees?page=${page}`}
                                className={`rounded-md border px-3 py-2 text-sm ${
                                    page === employees.current_page
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}

                        {employees.current_page < employees.last_page && (
                            <Link
                                href={`/employees?page=${employees.current_page + 1}`}
                                className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
                            >
                                Next
                            </Link>
                        )}
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}