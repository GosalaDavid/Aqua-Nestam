"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { getMyHatchery, createOrUpdateHatchery } from '@/services/dataService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader2 } from 'lucide-react';

export default function HatcheryDashboard() {
    const { user } = useAuthStore();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        availableSeeds: '', // Comma Sep
    });

    const fetchProfile = async () => {
        try {
            const res = await getMyHatchery();
            if (res.success) {
                setProfile(res.data);
                setFormData({
                    name: res.data.name,
                    address: res.data.address,
                    availableSeeds: res.data.availableSeeds.join(', '),
                });
            }
        } catch (e) {
            // Profile might not exist yet
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createOrUpdateHatchery(formData);
            if (res.success) {
                setProfile(res.data);
                setEditing(false);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !profile && !editing) {
        return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Hatchery Dashboard</h2>
                {profile && !editing && (
                    <Button size="sm" onClick={() => setEditing(true)}>Edit Profile</Button>
                )}
            </div>

            {!profile || editing ? (
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">{profile ? 'Edit Profile' : 'Create Profile'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Hatchery Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Location / Address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
                        <Input
                            label="Available Seeds (Comma separated)"
                            placeholder="Vannamei, Monodon, etc."
                            value={formData.availableSeeds}
                            onChange={(e) => setFormData({ ...formData, availableSeeds: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Profile'}
                            </Button>
                            {profile && (
                                <Button type="button" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
                            )}
                        </div>
                    </form>
                </Card>
            ) : (
                <Card className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-primary">{profile.name}</h3>
                            <p className="text-muted">{profile.address}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${profile.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                profile.status === 'Active' ? 'bg-green-100 text-green-700' :
                                    'bg-yellow-100 text-yellow-700'
                            }`}>
                            {profile.status}
                        </span>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-2">Available Seeds:</h4>
                        <div className="flex flex-wrap gap-2">
                            {profile.availableSeeds.map((seed: string, i: number) => (
                                <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm">
                                    {seed}
                                </span>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            {/* Placeholder for Order History */}
            <h3 className="text-xl font-bold mt-8">Recent Orders</h3>
            <div className="text-muted text-center py-8 bg-gray-50 rounded-lg">
                No orders content yet.
            </div>
        </div>
    );
}
