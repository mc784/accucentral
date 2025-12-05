
import type { Tour } from '../components/tour/useTour';

export const providerOnboardingTour: Tour = {
  id: 'provider-onboarding',
  steps: [
    {
      selector: '',
      title: 'Welcome to Your Dashboard!',
      content: 'This quick tour will walk you through the key features of your provider dashboard.',
    },
    {
      selector: '#tour-quick-log-session',
      title: 'Log a Session',
      content: 'Click here to quickly log a new session with a patient, enter pain scores, and record treatment details.',
      position: 'bottom',
    },
    {
      selector: '#tour-total-earnings',
      title: 'Track Your Earnings',
      content: 'This card shows your all-time total earnings. You can find more detailed payout information in the "Earnings" tab.',
      position: 'bottom',
    },
    {
      selector: '#tour-bookings-tab',
      title: 'Manage Your Bookings',
      content: 'Click this tab to view and manage all of your upcoming and past bookings.',
      position: 'bottom',
    },
     {
      selector: '#tour-earnings-tab',
      title: 'View Payouts',
      content: 'Here you can see your detailed earnings history and upcoming payouts.',
      position: 'bottom',
    },
    {
      selector: '',
      title: "You're All Set!",
      content: 'You can always find more information and resources in the Profile tab. Happy healing!',
    }
  ],
};

export const adminOnboardingTour: Tour = {
  id: 'admin-onboarding',
  steps: [
    {
      selector: '',
      title: 'Welcome, Admin!',
      content: 'This is the AccuCentral Operations Center. This tour will highlight your key administrative functions.'
    },
    {
      selector: '#tour-admin-alert-bar',
      title: 'Action Alerts',
      content: 'This bar shows urgent items that need your attention, like provider applications and bookings that need to be assigned.',
      position: 'bottom',
    },
    {
      selector: '#tour-admin-revenue-card',
      title: 'Key Metrics',
      content: 'Get a quick overview of your business health. Track revenue, bookings, patients, and providers at a glance.',
      position: 'bottom',
    },
    {
      selector: '#tour-admin-priority-actions',
      title: 'Priority Actions',
      content: 'This section shows the most important tasks for today, such as assigning providers to new bookings.',
      position: 'right',
    },
    {
      selector: '#tour-admin-providers-tab',
      title: 'Provider Management',
      content: 'Use this tab to manage your active providers and review applications from new therapists.',
      position: 'bottom',
    },
    {
      selector: '#tour-admin-provider-approval-link',
      title: 'Quick Links',
      content: 'These links provide direct access to your most common tasks, like approving new providers.',
      position: 'top',
    },
    {
      selector: '',
      title: 'Tour Complete',
      content: "You're ready to manage operations. You can restart this tour anytime from the header.",
    }
  ]
};

export const patientOnboardingTour: Tour = {
  id: 'patient-onboarding',
  steps: [
    {
      selector: '',
      title: 'Welcome to Your Dashboard!',
      content: "This is your personal space to track your treatment progress. Let's take a quick look around."
    },
    {
      selector: '#tour-patient-pain-reduction',
      title: 'Your Progress',
      content: 'This is the most important number—the percentage your pain has reduced since you started. Great work!',
      position: 'bottom',
    },
    {
      selector: '#tour-patient-pain-chart',
      title: 'Your Pain Journey',
      content: 'This chart visualizes your pain scores over time. You can see your progress from session to session.',
      position: 'top',
    },
    {
      selector: '#tour-patient-sessions-balance',
      title: 'Sessions Balance',
      content: 'Track your completed sessions and see how many you have remaining in your current package.',
      position: 'top',
    },
    {
      selector: '#tour-patient-homework',
      title: "Today's Homework",
      content: 'Your provider may assign you specific exercises or activities to do at home. You can find them here.',
      position: 'top',
    },
    {
      selector: '',
      title: "You're All Set!",
      content: 'Consistency is key to recovery. Keep up with your sessions and homework. We are here to support you!',
    }
  ]
};

export const patientRenewalTourStep = {
  selector: '#tour-patient-renewal-alert',
  title: 'Renew Your Package',
  content: "Your package is almost complete. Renew now to continue your progress without interruption.",
  position: 'bottom' as const,
};
