'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { token } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      loadMetrics();
    }
  }, [token]);

  const loadMetrics = async () => {
    try {
      const data = await apiClient.getDashboardMetrics(token!);
      setMetrics(data);
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Products',
      value: metrics?.totalProducts || '0',
      icon: Package,
      description: 'Active products in store',
    },
    {
      title: 'Total Orders',
      value: metrics?.totalOrders || '0',
      icon: ShoppingCart,
      description: 'Orders this month',
    },
    {
      title: 'Total Customers',
      value: metrics?.totalCustomers || '0',
      icon: Users,
      description: 'Registered customers',
    },
    {
      title: 'Revenue',
      value: `$${metrics?.totalRevenue || '0'}`,
      icon: TrendingUp,
      description: 'Total revenue',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your ecommerce admin dashboard
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Quick actions to manage your ecommerce platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Package className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-semibold">Manage Products</h3>
              <p className="text-sm text-muted-foreground">
                Add, edit, or remove products from your catalog
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <ShoppingCart className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-semibold">View Orders</h3>
              <p className="text-sm text-muted-foreground">
                Track and manage customer orders
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Users className="h-8 w-8 mb-2 text-primary" />
              <h3 className="font-semibold">Manage Customers</h3>
              <p className="text-sm text-muted-foreground">
                View and manage customer accounts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
