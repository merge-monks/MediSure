import React from "react";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  Stethoscope,
  Ambulance,
  User,
  Calendar,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background/80 border-t border-muted/20">
      {/* Main Footer Content */}
      <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <div className="flex gap-36 justify-between">
          {/* Brand Section */}
          <div className="w-1/2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-white text-cyan-600 p-2 rounded-lg shadow-md flex items-center justify-center">
                <div className="h-6 w-6 pb-2 text-3xl flex items-center justify-center font-extrabold leading-none m">
                  +
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                  MediSure
                </span>
                <span className="text-xs text-muted-foreground">
                  Healthcare Excellence
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              As a dedicated healthcare provider, we are committed to delivering
              comprehensive medical services with state-of-the-art technology
              and compassionate care to ensure the well-being of our patients.
            </p>

            
          </div>

          {/* Contact & Hours */}
          <div className="space-y-6 w-1/2">
            <div className="flex items-center gap-2">
              <Ambulance className="w-5 h-5 text-cyan-500" />
              <h3 className="text-lg font-semibold">Contact & Hours</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 text-cyan-500 shrink-0" />
                <span>
                  123 Healthcare Avenue
                  <br />
                  Medical District
                  <br />
                  MD 12345
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 text-cyan-500" />
                <a
                  href="tel:+1-800-MED-HELP"
                  className="hover:text-cyan-500 transition-colors duration-200"
                >
                  1-800-MED-HELP
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 text-cyan-500" />
                <a
                  href="mailto:care@mediconnect.com"
                  className="hover:text-cyan-500 transition-colors duration-200"
                >
                  care@medisure.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="w-5 h-5 text-cyan-500" />
                <div>
                  <p>Mon-Fri: 8:00 AM - 8:00 PM</p>
                  <p>Sat-Sun: 9:00 AM - 5:00 PM</p>
                  <p className="text-cyan-500 font-semibold">Emergency: 24/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} MediSure. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* Emergency Banner */}
      <div className="w-full bg-cyan-500 py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-semibold">
                24/7 Emergency: 1-800-MED-HELP
              </span>
            </div>
            <span className="text-sm hidden sm:block">
              Always Available for Your Care
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}