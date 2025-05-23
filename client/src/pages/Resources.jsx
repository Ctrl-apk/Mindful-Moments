import React, { useState, useEffect } from 'react';
import { useMindful } from '@/context/MindfulContext';
import ResourceCard from '@/components/resources/ResourceCard';
import CategoryCard from '@/components/resources/CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { apiRequest } from '@/lib/queryClient';

const Resources = () => {
  const { resources } = useMindful();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [allResources, setAllResources] = useState([]);
  const [featuredResources, setFeaturedResources] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Fetch resources from API
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all resources
        const allResourcesResponse = await fetch('/api/resources');
        const allResourcesData = await allResourcesResponse.json();
        
        // Fetch featured resources
        const featuredResourcesResponse = await fetch('/api/resources/featured');
        const featuredResourcesData = await featuredResourcesResponse.json();
        
        setAllResources(allResourcesData);
        setFeaturedResources(featuredResourcesData);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(allResourcesData.map(r => r.category))];
        setCategories(uniqueCategories);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, []);
  
  // Filter resources based on selected category
  const filteredResources = selectedCategory === 'all'
    ? allResources
    : allResources.filter(r => r.category.toLowerCase() === selectedCategory.toLowerCase());
  
  // Get count of resources by type
  const getTypeCount = (type) => {
    return allResources.filter(r => r.type?.toUpperCase() === type).length;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="h-8 w-48 mb-6" />
        
        {/* Resource Categories Skeleton */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
        </section>
        
        {/* Featured Resource Skeleton */}
        <section className="mb-8">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              <Skeleton className="md:w-1/3 h-48" />
              <div className="p-6 md:w-2/3 space-y-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Latest Resources Skeleton */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        </section>
      </div>
    );
  }
  
  // Get all resource types
  const resourceTypes = ['ARTICLE', 'VIDEO', 'PODCAST', 'DOWNLOAD'];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="font-heading text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-6">Mindfulness Resources</h2>
      
      {/* Resource Categories */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {resourceTypes.map(type => (
            <CategoryCard 
              key={type}
              type={type} 
              count={getTypeCount(type)} 
              onClick={() => setSelectedCategory(type.toLowerCase())}
            />
          ))}
        </div>
      </section>
      
      {/* Featured Resources */}
      <section className="mb-8">
        <h3 className="font-heading text-xl font-semibold text-neutral-700 dark:text-neutral-200 mb-4">Featured Resources</h3>
        
        {featuredResources.length > 0 ? (
          <div className="space-y-4">
            {featuredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} featured={true} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 text-center">
            <p className="text-neutral-600 dark:text-neutral-300">No featured resources currently available.</p>
          </div>
        )}
      </section>
      
      {/* Latest Resources */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h3 className="font-heading text-xl font-semibold text-neutral-700 dark:text-neutral-200">Latest Resources</h3>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {filteredResources.length === 0 ? (
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 text-center">
            <p className="text-neutral-600 dark:text-neutral-300">No resources found in this category.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Resources;