"use client"

import { useParams } from 'next/navigation';
import ProjectsDetails from '../../_components/pages/Projects-Details';

const page = () => {
  const projectId = useParams();

  return (
    <div className='min-h-screen  px-4 lg:py-8 py-10 sm:px-6 lg:px-20'>
      <ProjectsDetails projectId={projectId.id}/>
    </div>
  )
}

export default page
