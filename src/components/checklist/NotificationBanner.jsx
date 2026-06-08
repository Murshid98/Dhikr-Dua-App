import React, { useState, useEffect } from 'react'

export default function NotificationBanner() {
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  )
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('dhikr_notif_dismissed') === 'true'
  )
  const [reminderSet, setReminderSet] = useState(
    () => localStorage.getItem('dhikr_reminder_set') === 'true'
  )

  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (typeof Notification === 'undefined') return
    const result = await Notification.requestPermission()
    setPermission(result)
    if (result === 'granted') {
      scheduleReminders()
    }
  }

  const scheduleReminders = () => {
    // Show immediate confirmation notification
    new Notification('ദൈനംദിന ദിക്ർ 🌙', {
      body: 'Reminders enabled! You will be reminded for your daily duas.',
      icon: '/crescent.svg',
      badge: '/crescent.svg',
    })

    localStorage.setItem('dhikr_reminder_set', 'true')
    setReminderSet(true)

    // Schedule a morning reminder using setTimeout (works for current session)
    const now = new Date()
    const morning = new Date()
    morning.setHours(6, 0, 0, 0)
    if (morning <= now) morning.setDate(morning.getDate() + 1)

    const msUntilMorning = morning - now
    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('🌅 Good Morning! Daily Duas', {
          body: 'Start your day with the morning dua. Tap to open.',
          icon: '/crescent.svg',
        })
      }
    }, msUntilMorning)

    // Evening reminder
    const evening = new Date()
    evening.setHours(20, 0, 0, 0)
    if (evening <= now) evening.setDate(evening.getDate() + 1)
    const msUntilEvening = evening - now
    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('🌙 Evening Reminder', {
          body: "Don't forget your evening duas before sleep!",
          icon: '/crescent.svg',
        })
      }
    }, msUntilEvening)
  }

  const dismiss = () => {
    setDismissed(true)
    localStorage.setItem('dhikr_notif_dismissed', 'true')
  }

  // Don't show if: already dismissed, already granted, or notifications not supported
  if (dismissed || permission === 'granted' || permission === 'denied') return null
  if (typeof Notification === 'undefined') return null

  return (
    <div className="card p-4 border-l-4 border-l-islamic-gold bg-amber-50 dark:bg-amber-900/20 animate-fade-in">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🔔</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
            Enable Daily Reminders
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
            Get notified at 6 AM & 8 PM for your daily duas
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={requestPermission}
              className="text-xs font-semibold px-3 py-1.5 bg-islamic-gold text-white rounded-lg hover:bg-islamic-gold-light transition-colors"
            >
              Enable Notifications
            </button>
            <button
              onClick={dismiss}
              className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          onClick={dismiss}
          className="text-amber-400 hover:text-amber-600 dark:hover:text-amber-200 transition-colors flex-shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
