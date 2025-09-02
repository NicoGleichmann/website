import { useState } from 'react'
//import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Send, MapPin, Phone, Clock } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Newsletter logic here
    setIsSubscribed(true)
    setEmail('')
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    // Contact form logic here
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <div className="text-center mb-8">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Bleib im Licht
                </h3>
                <p className="text-muted-foreground">
                  Erhalte exklusive Updates, neue Produkte und 
                  <span className="text-primary font-semibold"> 10% Rabatt auf deine erste Bestellung</span>
                </p>
              </div>

              {!isSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Deine E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                  <Button 
                    type="submit" 
                    className="w-full glow-effect hover:scale-105 transition-all duration-300"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Newsletter abonnieren
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-green-600 mb-2">
                    Willkommen bei Lumio!
                  </h4>
                  <p className="text-muted-foreground">
                    Dein 10% Rabattcode wurde an deine E-Mail gesendet.
                  </p>
                </motion.div>
              )}

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Keine Spam-Mails. Jederzeit abbestellbar.
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Kontaktiere uns
              </h3>
              <p className="text-muted-foreground mb-8">
                Hast du Fragen, Feedback oder möchtest du einfach Hallo sagen? 
                Wir freuen uns auf deine Nachricht!
              </p>

              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className="space-y-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Dein Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Deine E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Textarea
                  placeholder="Deine Nachricht..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                />
                <Button 
                  type="submit" 
                  className="w-full glow-effect hover:scale-105 transition-all duration-300"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Nachricht senden
                </Button>
              </form>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Berlin, Deutschland</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>hello@lumio.style</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+49 (0) 30 12345678</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Mo-Fr: 9:00 - 18:00 Uhr</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

