class HospitalService {
  private static instance: HospitalService;
  private host: string = process.env.REACT_APP_HOST!;

  private constructor() {}

  public static getInstance(): HospitalService {
    if (!HospitalService.instance)
      HospitalService.instance = new HospitalService();

    return HospitalService.instance;
  }

  public async getShifts(): Promise<any> {
    const res = await fetch(`${this.host}/api/hospital/shifts/`, {
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) return [];
    return data.data;
  }

  public async assignShift(shiftId: number, nurseId: string): Promise<any> {
    const res = await fetch(`${this.host}/api/hospital/shifts/${shiftId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nurse: nurseId }),
      credentials: "include",
    });
    const data = await res.json();

    return data;
  }

  public async addShift(payload: any) {
    const res = await fetch(`${this.host}/api/hospital/shifts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await res.json();

    return data;
  }
}

export default HospitalService;
