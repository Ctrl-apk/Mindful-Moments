import { useState } from 'react';
import { useMindful } from '@/context/MindfulContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { User } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const userProfileSchema = z.object({
  displayName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  mindfulnessLevel: z.string(),
  bio: z.string().optional(),
});

// Sound preferences schema
const soundPreferencesSchema = z.object({
  preferredSound: z.enum(['nature', 'music', 'whitenoise', 'silence']),
  language: z.string(),
  darkMode: z.boolean(),
  reminderEnabled: z.boolean(),
});

type UserProfileFormValues = z.infer<typeof userProfileSchema>;
type SoundPreferencesFormValues = z.infer<typeof soundPreferencesSchema>;

const Settings = () => {
  const { user, isLoading, updateUserPreferences } = useMindful();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // User profile form
  const profileForm = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      mindfulnessLevel: user?.mindfulnessLevel || 'beginner',
      bio: user?.bio || '',
    },
  });
  
  // App settings form
  const preferencesForm = useForm<SoundPreferencesFormValues>({
    resolver: zodResolver(soundPreferencesSchema),
    defaultValues: {
      preferredSound: (user?.preferredSound as any) || 'nature',
      language: user?.language || 'english',
      darkMode: user?.darkMode || false,
      reminderEnabled: user?.reminderEnabled || true,
    },
  });
  
  // Set form values when user data loads
  useState(() => {
    if (user) {
      profileForm.reset({
        displayName: user.displayName,
        email: user.email || '',
        mindfulnessLevel: user.mindfulnessLevel,
        bio: user.bio || '',
      });
      
      preferencesForm.reset({
        preferredSound: (user.preferredSound as any),
        language: user.language,
        darkMode: user.darkMode,
        reminderEnabled: user.reminderEnabled,
      });
    }
  });
  
  // Submit handler for user profile
  const onSubmitProfile = async (data: UserProfileFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await updateUserPreferences(data);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error updating profile",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Submit handler for app settings
  const onSubmitPreferences = async (data: SoundPreferencesFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      await updateUserPreferences(data);
      toast({
        title: "Preferences updated",
        description: "Your app settings have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error updating preferences",
        description: "There was a problem updating your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="h-8 w-32 mb-6" />
        
        {/* User Settings Form Skeleton */}
        <section className="mb-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* App Settings Skeleton */}
        <section>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-2 pt-4 border-t border-neutral-200">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }
  
  if (!user) return null;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="font-heading text-2xl font-semibold text-neutral-700 mb-6">Preferences</h2>
      
      {/* User Settings Form */}
      <section className="mb-8">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-semibold text-neutral-700">Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={profileForm.control}
                    name="displayName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="mindfulnessLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mindfulness Level</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-neutral-200 mr-3 flex items-center justify-center">
                        <User className="h-6 w-6 text-neutral-500" />
                      </div>
                      <Button type="button" variant="outline">
                        Change
                      </Button>
                    </div>
                  </FormItem>
                </div>
                
                <FormField
                  control={profileForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Share a little about yourself and your mindfulness journey"
                          className="resize-none h-24"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white"
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
      
      {/* App Settings */}
      <section>
        <Card className="bg-white rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl font-semibold text-neutral-700">App Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...preferencesForm}>
              <form onSubmit={preferencesForm.handleSubmit(onSubmitPreferences)} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-heading font-medium text-neutral-700">Daily Reminders</h4>
                    <p className="text-sm text-neutral-500">Receive notifications for your mindfulness practice</p>
                  </div>
                  <FormField
                    control={preferencesForm.control}
                    name="reminderEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="border-t border-neutral-200 pt-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-heading font-medium text-neutral-700">Dark Mode</h4>
                      <p className="text-sm text-neutral-500">Use dark theme for the app</p>
                    </div>
                    <FormField
                      control={preferencesForm.control}
                      name="darkMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-5">
                  <FormField
                    control={preferencesForm.control}
                    name="preferredSound"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading font-medium text-neutral-700 mb-2">Meditation Sounds</FormLabel>
                        <FormDescription className="text-sm text-neutral-500 mb-3">
                          Select your preferred ambient sound
                        </FormDescription>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="nature" />
                              </FormControl>
                              <FormLabel className="font-normal text-neutral-600">
                                Nature Sounds
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="music" />
                              </FormControl>
                              <FormLabel className="font-normal text-neutral-600">
                                Soft Music
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="whitenoise" />
                              </FormControl>
                              <FormLabel className="font-normal text-neutral-600">
                                White Noise
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="silence" />
                              </FormControl>
                              <FormLabel className="font-normal text-neutral-600">
                                Silence
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="border-t border-neutral-200 pt-5">
                  <FormField
                    control={preferencesForm.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading font-medium text-neutral-700 mb-2">App Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full md:w-1/3">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end border-t border-neutral-200 pt-5">
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white"
                    disabled={isSubmitting}
                  >
                    Save Settings
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Settings;
