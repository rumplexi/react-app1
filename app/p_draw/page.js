'use client'
import { useSearchParams } from 'next/navigation';
import modelMap from '../models/modelMap'
// import { useState } from 'react';

export default function Draw() {

  const params = useSearchParams()
  const compNum = params.get('compNum')
  const Comp = modelMap[compNum]['model']

  return (
    <div id='p5-container' className="p-4">
      <Comp />
    </div>
  )
}
