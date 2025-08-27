import { motion } from 'framer-motion'
import { Lightbulb, Leaf, Users } from 'lucide-react'
import innovationIcon from '../assets/innovation_icon.png'
import sustainabilityIcon from '../assets/sustainability_icon.jpg'
import communityIcon from '../assets/community_icon.jpg'

const About = () => {
  const features = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      image: innovationIcon,
      title: "Innovation & Design",
      description: "Moderne, stilvolle Produkte mit einem innovativen Touch. Wir verbinden Technologie mit Ästhetik für einzigartige Designs."
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      image: sustainabilityIcon,
      title: "Nachhaltigkeit",
      description: "Print-on-Demand Produktion vermeidet Überproduktion und schont die Umwelt. Qualität vor Quantität ist unser Prinzip."
    },
    {
      icon: <Users className="h-8 w-8" />,
      image: communityIcon,
      title: "Community-Driven",
      description: "Unsere Community steht im Mittelpunkt. Gemeinsam gestalten wir Trends und bringen innovative Ideen zum Leben."
    }
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Unsere Vision
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Lumio verbindet Mode, Accessoires und Licht zu einer einzigartigen Erfahrung. 
            Wir schaffen moderne, stilvolle Produkte, die deinen individuellen Style zum Ausdruck bringen 
            und gleichzeitig innovative Technologie integrieren.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-card rounded-2xl p-8 card-hover border border-border">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-muted-foreground">Einzigartige Designs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5K+</div>
            <div className="text-muted-foreground">Zufriedene Kunden</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Nachhaltig</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About

