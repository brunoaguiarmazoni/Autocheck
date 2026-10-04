import { clerkSetup } from '@clerk/testing/playwright';

export default async function globalSetup(config: any) {
  process.env['CLERK_PUBLISHABLE_KEY'] = process.env['CLERK_PUBLISHABLE_KEY'] || process.env['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'];
  
  await clerkSetup();
}
