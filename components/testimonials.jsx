import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
    {
        name: 'Ananya Sharma',
        role: 'AI Learner',
        image: 'https://randomuser.me/api/portraits/women/21.jpg',
        quote: 'With no prior knowledge in AI, I completed multiple modules in minutes thanks to MindLyst’s intuitive and interactive learning platform.',
    },
    {
        name: 'Rohit Gupta',
        role: 'Machine Learning Engineer',
        image: 'https://randomuser.me/api/portraits/men/33.jpg',
        quote: 'Great experience using MindLyst for AI education. This is one of the most well-structured learning platforms I have encountered so far.',
    },
    {
        name: 'Priya Reddy',
        role: 'Data Scientist',
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
        quote: 'MindLyst is redefining AI learning standards by providing clear blocks of content, making it simple for those who value knowledge but lack time to learn traditionally. Highly recommended.',
    },
    {
        name: 'Vikram Singh',
        role: 'AI Researcher',
        image: 'https://randomuser.me/api/portraits/men/29.jpg',
        quote: 'Using MindLyst felt like unlocking a hidden superpower for learning. The perfect combination of simplicity and deep content helped me grow fast in AI.',
    },
   {
    name: 'Anjali Verma',
    role: 'Software Developer',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
    quote: 'MindLyst offers a perfect solution for anyone wanting to learn AI without prior experience. It’s easy to use, customizable, and highly responsive to different learning needs. The platform’s interactive tutorials, real-world projects, and clear learning paths helped me build confidence and practical skills in AI development quickly. I highly recommend it to beginners and professionals alike.',
},

]

const chunkArray = (array, chunkSize) => {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3))

export default function WallOfLoveSection() {
    return (
        <section>
            <div className="py-16 md:py-32">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold">Loved by AI Learners</h2>
                        <p className="mt-6 text-gray-600">Thousands are advancing their AI knowledge faster and smarter using MindLyst.</p>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
                        {testimonialChunks.map((chunk, chunkIndex) => (
                            <div key={chunkIndex} className="space-y-3">
                                {chunk.map(({ name, role, quote, image }, index) => (
                                    <Card key={index}>
                                        <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                                            <Avatar className="size-9">
                                                <AvatarImage alt={name} src={image} loading="lazy" width="120" height="120" />
                                                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <h3 className="font-medium">{name}</h3>
                                                <span className="text-muted-foreground block text-sm tracking-wide">{role}</span>

                                                <blockquote className="mt-3">
                                                    <p className="text-gray-700 dark:text-gray-300">{quote}</p>
                                                </blockquote>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
