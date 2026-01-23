/**
 * Category Management Component
 * Example of using the Outdoors API for CRUD operations
 */

'use client';

import React from "react"

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { categories, type Category } from '@/lib/outdoors-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function CategoryManager() {
  const { token, isAuthenticated, isLoading: authLoading } = useAuth();
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ name: '', url: '', parent_id: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch categories on component mount or when token changes
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCategories();
    }
  }, [isAuthenticated, token]);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await categories.getAll(token);
      setCategoryList(data);
      console.log('[v0] Categories fetched:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      console.error('[v0] Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (editingId) {
        // Update
        await categories.update(editingId, formData, token);
        setSuccess('Category updated successfully');
        console.log('[v0] Category updated:', editingId);
      } else {
        // Create
        await categories.create(formData, token);
        setSuccess('Category created successfully');
        console.log('[v0] Category created');
      }

      setFormData({ name: '', url: '', parent_id: 0 });
      setEditingId(null);
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
      console.error('[v0] Operation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      url: category.url,
      parent_id: category.parent_id || 0,
    });
    setEditingId(category.category_id || null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    setIsLoading(true);
    setError('');

    try {
      await categories.delete(id, token);
      setSuccess('Category deleted successfully');
      console.log('[v0] Category deleted:', id);
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
      console.error('[v0] Delete error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', url: '', parent_id: 0 });
    setEditingId(null);
  };

  if (authLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="p-4 text-red-500">Not authenticated. Please log in.</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? 'Edit Category' : 'Add New Category'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Billboards"
                required
              />
            </div>

            <div>
              <Label htmlFor="url">URL Slug</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="e.g., billboards"
                required
              />
            </div>

            <div>
              <Label htmlFor="parent_id">Parent Category ID</Label>
              <Input
                id="parent_id"
                type="number"
                value={formData.parent_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    parent_id: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="0 for no parent"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded">
              {success}
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>

        {categoryList.length === 0 ? (
          <p className="text-muted-foreground">No categories yet</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Parent ID</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryList.map((category) => (
                  <TableRow key={category.category_id}>
                    <TableCell>{category.category_id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.url}</TableCell>
                    <TableCell>{category.parent_id || '-'}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(category)}
                        disabled={isLoading}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          category.category_id &&
                          handleDelete(category.category_id)
                        }
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
