import { Link } from 'react-router'
import RecentJobs from '../../components/dashboard/RecentJobs'
import Button from '../../components/ui/button/Button'
import { PlusIcon } from '../../icons'

const JobPage = () => {
    return (
        <div>
            <div className='flex justify-end w-full'>
                <Link to={'/jobs/add'}>
                    <Button className='mb-6'>
                        <PlusIcon />
                        Add New Job
                    </Button>
                </Link>
            </div>
            <RecentJobs />
        </div>
    )
}

export default JobPage