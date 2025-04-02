import React from 'react'

export const Heading = ({ title }: { title: string }) => {
  return (
    <h1 className="text-4xl font-light">{title}</h1>
  )
}
