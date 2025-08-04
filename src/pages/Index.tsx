const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              HabitFlow 2.0
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma página em branco pronta para ser construída
            </p>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-primary rounded" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Moderno</h3>
              <p className="text-muted-foreground">Design system limpo e elegante</p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-primary rounded-full" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Responsivo</h3>
              <p className="text-muted-foreground">Funciona perfeitamente em todos os dispositivos</p>
            </div>
            
            <div className="p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent-foreground rounded" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexível</h3>
              <p className="text-muted-foreground">Pronto para qualquer funcionalidade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;