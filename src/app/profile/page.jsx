import Header from '@/components/layout/Header';
import ProfileCard from '@/components/profile/ProfileCard';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <ProfileCard />
      </main>
    </div>
  );
} 