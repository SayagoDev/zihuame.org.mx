import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { Report } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";

export interface ReportDTO {
  id: string;
  pdfUrl: string;
  title: string;
  imgUrl?: string;
  shadowColor?: string;
}

function mapReportToDTO(report: Report): ReportDTO {
  return {
    id: report._id,
    pdfUrl: report.pdf?.asset?.url,
    title: report.title || "",
    imgUrl: report.image?.img?.asset?.url,
    shadowColor: report.image?.shadow?.hex || "",
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

      return reports.data.map(mapReportToDTO);
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
