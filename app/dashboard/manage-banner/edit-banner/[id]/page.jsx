
import EditBannerForm from "@/app/dashboard/components/BannerEditForm";
import Layout from "@/app/dashboard/components/Layout";
import Link from "next/link";


export default function EditPage() {
  return (
    <Layout>
      <section className="p-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl fw-bold text-gray-500 ">Add/Edit Banner</div>
          <div>
            <Link href="./" className="mr-3">
              <button className="mt-3 px-4 py-2 bg-green-600 text-white font-bold rounded">
                Back
              </button>
            </Link>
            <Link href="./add-banner">
              <button className="mt-3 px-4 py-2 bg-cyan-600 text-white font-bold rounded">
                Reset
              </button>
            </Link>
          </div>
        </div>
        <hr className="bg-red-500 w-100" />
      </section>

    <section className="px-3">
     <div className="form-title bg-blue-700 text-white text-md font-medium p-3">
          Edit Banner 
        </div>
      <EditBannerForm />
    </section>
    </Layout>
  );
}
