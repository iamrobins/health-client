class MediatorService {
  private static instance: MediatorService;
  private host: string = process.env.REACT_APP_HOST!;

  private constructor() {}

  public static getInstance(): MediatorService {
    if (!MediatorService.instance)
      MediatorService.instance = new MediatorService();

    return MediatorService.instance;
  }

  public async createGroup(type: string, payload: any): Promise<any> {
    const res = await fetch(`${this.host}/api/mediator/register/${type}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();

    return data;
  }
}

export default MediatorService;
