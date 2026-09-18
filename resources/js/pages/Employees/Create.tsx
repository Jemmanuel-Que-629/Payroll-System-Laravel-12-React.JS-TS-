import { Head, Link, useForm } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

interface Employee {
    id: number
    employee_id: string
    first_name: string
    last_name: string
    email: string
    position: string
    employment_type: string
    basic_salary: string
    status: string
}

interface Props {
    employees: Employee[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: '/employees',
    },
]

export default function Index({ employees }: Props) {

    const { data, setData, post, processing, errors, reset } = useForm({
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        employment_type: '',
        basic_salary: '',
        status: 'active',
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()

        post('/employees', {
            onSuccess: () => {
                reset()
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Employees" />

            {/* Page header */}

            <Dialog>

                <DialogTrigger asChild>
                    <button>
                        Add Employee
                    </button>
                </DialogTrigger>

                <DialogContent>

                    <DialogHeader>
                        <DialogTitle>Add Employee</DialogTitle>
                        <DialogDescription>
                            Enter the employee information below.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submit}>

                        {/* Employee fields */}

                    </form>

                </DialogContent>

            </Dialog>

            {/* Employee table */}

        </AppLayout>
    )
}