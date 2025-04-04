import { Progress } from "@heroui/progress"

function Loading() {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
      <Progress
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
      color="warning"
    />
    </div>
  )
}

export default Loading