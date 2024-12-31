export function Footer() {
  return (
    <footer className="bg-background py-6 mb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mrutunjay Yadav. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
