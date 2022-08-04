import type Analysis from "~/models/analysis.model";
import type ResponseDto from "~/models/response-dto.model";
import HttpService from "~/services/http.service";

const AnalysisApiService = {
  getPath(path: string | number = '') {
    return `analysis/${path}`;
  },

  async read(accessToken: string): Promise<ResponseDto<Analysis>> {
    const res = await HttpService.get(this.getPath(), accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },
};

export default AnalysisApiService;
