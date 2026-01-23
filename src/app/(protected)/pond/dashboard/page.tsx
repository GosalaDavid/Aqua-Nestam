"use client";

import { useEffect, useState } from 'react';
import { getHatcheries, createOrder } from '@/services/dataService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader2, Search, MapPin } from 'lucide-react';

export default function PondDashboard() {
    const [hatcheries, setHatcheries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Order Modal State
    const [selectedHatchery, setSelectedHatchery] = useState<any>(null);
    const [orderQuantity, setOrderQuantity] = useState('');
    const [orderType, setOrderType] = useState('');

    useEffect(() => {
        fetchHatcheries();
    }, []);

    const fetchHatcheries = async () => {
        try {
            const res = await getHatcheries();
            if (res.success) {
                setHatcheries(res.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedHatchery) return;

        // Call API (Logic assumed for simplicity)
        try {
            await createOrder({
                hatcheryId: selectedHatchery._id,
                seedDetails: orderType,
                quantity: Number(orderQuantity)
            });
            alert('Order Placed Successfully!');
            setSelectedHatchery(null);
        } catch (err) {
            alert('Order Failed');
        }
    };

    const filtered = hatcheries.filter(h =>
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.address.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="bg-primary text-white p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-2">Find Quality Seeds</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search hatcheries by name or location..."
                        className="w-full pl-10 pr-4 py-3 rounded-lg text-dark focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map(hatchery => (
                        <Card key={hatchery._id} className="p-5 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-primary">{hatchery.name}</h3>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                    {hatchery.rating > 0 ? `${hatchery.rating} ★` : 'New'}
                                </span>
                            </div>

                            <div className="flex items-center text-muted text-sm mb-4">
                                <MapPin className="h-4 w-4 mr-1" />
                                {hatchery.address}
                            </div>

                            <div className="space-y-2 mb-4">
                                <p className="text-sm font-semibold">Available:</p>
                                <div className="flex flex-wrap gap-2">
                                    {hatchery.availableSeeds.map((s: string, i: number) => (
                                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Button
                                fullWidth
                                onClick={() => {
                                    setSelectedHatchery(hatchery);
                                    setOrderType(hatchery.availableSeeds[0] || '');
                                }}
                            >
                                Place Order
                            </Button>
                        </Card>
                    ))}
                </div>
            )}

            {/* Simple Order Modal Overlay */}
            {selectedHatchery && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-sm p-6 space-y-4">
                        <h3 className="font-bold text-lg">Order from {selectedHatchery.name}</h3>
                        <form onSubmit={handleOrder} className="space-y-4">
                            <Input
                                label="Seed Type"
                                value={orderType}
                                onChange={(e) => setOrderType(e.target.value)}
                            />
                            <Input
                                label="Quantity"
                                type="number"
                                value={orderQuantity}
                                onChange={(e) => setOrderQuantity(e.target.value)}
                                required
                            />
                            <div className="flex gap-2 pt-2">
                                <Button type="button" variant="ghost" fullWidth onClick={() => setSelectedHatchery(null)}>Cancel</Button>
                                <Button type="submit" fullWidth>Confirm Order</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
