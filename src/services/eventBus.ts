export class EventBus {
    private static listeners: Record<string, Function[]> = {}
  
    static register(): string {
      const id = Math.random().toString(36).substring(2, 9)
      this.listeners[id] = []
      return id
    }
  
    static subscribe(id: string, callback: Function): () => void {
      if (!this.listeners[id]) this.listeners[id] = []
      this.listeners[id].push(callback)
      // Return an unsubscribe function
      return () => {
        this.listeners[id] = this.listeners[id].filter(cb => cb !== callback)
      }
    }
  
    static dispatch(id: string, data: any) {
      this.listeners[id]?.forEach(cb => cb(data))
    }
}