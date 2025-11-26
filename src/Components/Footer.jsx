import React from 'react';

const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <div>
            <footer className="bg-base-300 text-base-content mt-8">
                <div className="max-w-6xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
                    {/* Brand / About */}
                    <div>
                        <h2 className="text-xl font-bold mb-2 text-primary">ToyTopia</h2>
                        <p className="text-sm">
                            A vibrant local marketplace where families discover fun, safe, and
                            creative toys for their kids.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
                        <ul className="space-y-1 text-sm">
                            <li>
                                <a href="#" className="link link-hover">
                                    Terms &amp; Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="link link-hover">
                                    Help &amp; Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact / Social */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
                        <p className="text-sm mb-3">
                            Email: <span className="font-medium">support@toytopia.com</span>
                        </p>
                        <div className="flex items-center gap-4 text-2xl">
                            <a href="#" aria-label="Facebook" className="hover:text-primary">
                                🌐
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-primary">
                                📷
                            </a>
                            <a href="#" aria-label="Twitter" className="hover:text-primary">
                                🐦
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-base-200">
                    <p className="text-center text-xs py-3">
                        &copy; {year} <span className="font-semibold">ToyTopia</span>. All
                        rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;