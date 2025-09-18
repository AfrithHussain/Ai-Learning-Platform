import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

export default function Pricing() {
    return (
        <section id='pricing' className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-center text-4xl font-semibold lg:text-5xl">
                        Simple Pricing, Unlimited Learning
                    </h1>
                    <p>
                        Choose a plan that grows with your goals — from free access to AI-powered learning paths 
                        to advanced features designed for serious learners and teams.
                    </p>
                </div>

                {/* The grid is now a 2-column grid, with a max-width and centered with mx-auto */}
<div  className="mx-auto mt-8 grid max-w-4xl gap-8 md:mt-20 md:grid-cols-2">
    
    {/* Free Plan */}
    <Card className="flex flex-col">
        <CardHeader>
            <CardTitle className="font-medium">Starter</CardTitle>
            <span className="my-3 block text-2xl font-semibold">$0 / mo</span>
            <CardDescription className="text-sm">For individuals</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
            <hr className="border-dashed" />
            <ul className="list-outside space-y-3 text-sm">
                {[
                    'Generate up to 3 AI Courses',
                    'Basic Progress Tracking',
                    'Community Access'
                ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <Check className="size-3" />
                        {item}
                    </li>
                ))}
            </ul>
        </CardContent>

        <CardFooter className="mt-auto">
            <Button asChild variant="outline" className="w-full">
                <Link href="https://accounts.mindlyst.xyz/sign-up">Start Free</Link>
            </Button>
        </CardFooter>
    </Card>

    {/* Pro Plan */}
    <Card className="relative border-purple-400">
        <span
            className="bg-gradient-to-br absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950 ring-1 ring-inset ring-white/20 ring-offset-1 ring-offset-gray-950/5">
            Most Popular
        </span>

        <div className="flex flex-col">
            <CardHeader>
                <CardTitle className="font-medium">Pro</CardTitle>
                <span className="my-3 block text-2xl font-semibold">$2 / mo</span>
                <CardDescription className="text-sm">For dedicated learners</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <hr className="border-dashed" />
                <ul className="list-outside space-y-3 text-sm">
                    {[
                        'Generate up to 6 AI Courses',
                        'Advanced Progress Analytics',
                        'Skill Progress Reports',
                        'Priority Support',
                        'Everything in Starter'
                    ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className="size-3" />
                            {item}
                        </li>
                    ))}
                </ul>
            </CardContent>

            <CardFooter className="mt-auto">
                <Button asChild className="w-full">
                    <Link href="https://accounts.mindlyst.xyz/sign-up">Upgrade to Pro</Link>
                </Button>
            </CardFooter>
        </div>
    </Card>

</div>
            </div>
        </section>
    );
}