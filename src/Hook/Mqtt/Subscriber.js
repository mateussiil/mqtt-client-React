import React, { useContext } from 'react'
import { QosOption } from './index'
import { useEffect } from 'react'

const Subscriber = () => {
  const { qosOptions, sub, record, showUnsub } = useContext(QosOption)

  useEffect(() => {
    if (showUnsub) return

    sub(record, qosOptions)
  }, [showUnsub, record, qosOptions, sub])

  return null
}

export default Subscriber
