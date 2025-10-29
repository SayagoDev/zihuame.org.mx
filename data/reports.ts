import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

// Tipos específicos para la respuesta de la query
type ReportQueryResponse = {
  _id: string;
  title: string;
  pdf: {
    asset: {
      url: string;
    };
  };
  image?: {
    img?: {
      asset?: {
        url: string;
      };
    };
    shadow?: {
      hex: string;
    };
  };
};

export interface ReportDTO {
  id: string;
  pdfUrl: string;
  title: string;
  imgUrl?: string;
  shadowColor?: string;
}

function mapReportToDTO(report: ReportQueryResponse): ReportDTO {
  return {
    id: report._id,
    pdfUrl: report.pdf.asset.url,
    title: report.title,
    imgUrl: report.image?.img?.asset?.url,
    shadowColor: report.image?.shadow?.hex,
  };
}

class ReportDAL {
  async getAllReports(): Promise<ReportDTO[]> {
    const ALL_REPORTS_QUERY = defineQuery(
      `*[_type == "report"]{
        _id, title,
            pdf{
              asset->{
                url
              }
            },
            image{
              img{
                asset->{
                  url
                }
              },
              shadow{
                hex
              }
            }
      } | order(title desc)`,
    );

    try {
      const reports = await sanityFetch({
        query: ALL_REPORTS_QUERY,
      });

      return reports.data.map((report) =>
        mapReportToDTO(report as ReportQueryResponse),
      );
    } catch (error) {
      console.error("Error fetching reports data:", error);
      return [];
    }
  }
}

export class ReportService {
  private reportDAL: ReportDAL;

  constructor() {
    this.reportDAL = new ReportDAL();
  }

  async getAllReports(): Promise<ReportDTO[]> {
    return await this.reportDAL.getAllReports();
  }
}
