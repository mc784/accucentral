import ProviderBottomNav from '@/components/ProviderBottomNav';

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProviderBottomNav />
    </>
  );
}
