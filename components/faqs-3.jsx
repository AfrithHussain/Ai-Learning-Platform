'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { DynamicIcon } from 'lucide-react/dynamic';
import Link from 'next/link'

export default function FAQsThree() {
    const faqItems = [
        {
            id: 'item-1',
            icon: 'book-open',
            question: 'How does the AI generate my learning path?',
            answer: 'Our AI analyzes your goals, skill level, and available study time to create a personalized roadmap. It updates dynamically as you make progress or change your preferences.',
        },
        {
            id: 'item-2',
            icon: 'credit-card',
            question: 'Is there a free plan available?',
            answer: 'Yes! We offer a free plan with core features like AI-generated learning paths and progress tracking. You can upgrade anytime to unlock advanced features such as reports, templates, and team dashboards.',
        },
        {
            id: 'item-3',
            icon: 'zap',
            question: 'Can I learn at my own pace?',
            answer: 'Absolutely. Our platform is fully self-paced. You can study on your own schedule, pause when needed, and let the AI adjust your plan accordingly.',
        },
        {
            id: 'item-4',
            icon: 'globe',
            question: 'Do you support multiple languages?',
            answer: 'Currently, the platform supports English. We are actively working on expanding to more languages to make learning accessible worldwide.',
        },
        {
            id: 'item-5',
            icon: 'shield',
            question: 'How secure is my data?',
            answer: 'We take privacy seriously. All data is encrypted in transit and at rest. Your learning preferences and progress are stored securely and never shared with third parties.',
        },
    ]

    return (
        <section className="bg-muted dark:bg-background py-20">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-20">
                            <h2 className="mt-4 text-3xl font-bold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Still curious? Reach out to our{' '}
                                <Link href="#" className="text-primary font-medium hover:underline">
                                    support team
                                </Link>{' '}
                                for more help.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion type="single" collapsible className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                <DynamicIcon name={item.icon} className="m-auto size-4" />
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-base">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
}
