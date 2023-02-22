class NurseService {
  private static instance: NurseService;
  private host: string = process.env.REACT_APP_HOST!;

  private constructor() {}

  public static getInstance(): NurseService {
    if (!NurseService.instance) NurseService.instance = new NurseService();

    return NurseService.instance;
  }

  public async getShifts(): Promise<any> {
    const res = await fetch(`${this.host}/api/nurse/shifts/`, {
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) return [];
    return data.data;
  }

  public async requestShift(shiftId: number): Promise<any> {
    const res = await fetch(`${this.host}/api/hospital/shifts/${shiftId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();

    return data;
  }
}

export default NurseService;
