import { Button } from "@/components/ui/button";
import ProfilePicModal from "@/components/ui/user/profile-pic-modal";
import api from "@/lib/api";
import type { PROFILE_PIC_T } from "@/types/user";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePic({ user, setUser, canEdit }: PROFILE_PIC_T) {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file) return;

		setUploading(true);
		setError(null);

		try {
			const formData = new FormData();
			formData.append("profileImage", file);

			const response = await api.post("/api/user/picture", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					authorization: `${Cookies.get("auth")}`,
				},
			});

			// Update user with new profilePic
			setUser({
				...user,
				profilePic: response.data.profilePic || user.profilePic,
			});

			setFile(null);

			toast.success("Profile picture uploaded successfully");
		} catch (err: any) {
			setError(err.message || "Failed to upload profile picture");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className='flex flex-col items-center space-y-2'>
			{/* Profile pic modal */}
			<ProfilePicModal user={user} />

			{/* Only show upload input if canEdit */}
			{canEdit && (
				<>
					<input
						type='file'
						accept='image/*'
						onChange={handleFileChange}
					/>

					{file && (
						<Button onClick={handleUpload} disabled={uploading}>
							{uploading ? "Uploading..." : "Upload New Picture"}
						</Button>
					)}

					{error && <p className='text-red-500'>{error}</p>}
				</>
			)}
		</div>
	);
}
