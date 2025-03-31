import React from 'react'
import {Card, CardBody} from "@heroui/card";

export default function AlertCard({title, message, className} : {title?: string, message: string, className?: string}) {
  return (
    <Card isBlurred>
      <CardBody>
        <div className='flex gap-2 justify-start items-center w-full px-5'>{title?<b className="text-medium">{title}: </b>:<></>} <p> {message}</p></div>
      </CardBody>
    </Card>
  )
}
