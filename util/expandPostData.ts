import { Child, ExpandedChild, ExpandedChildData, Image } from "~/types";

export function decodeHTML(html: string) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	console.log(txt.value);
	return txt.value;
}

export async function expandPostData(post: Child): Promise<ExpandedChild> {
	const postData = post.data;

	// Find gender in title
	const genderRegex = /\[([FM]+)4([FMA]+)\]/i;
	const genderMatch = postData.title.match(genderRegex);
	const gender = genderMatch
		? genderMatch[1].toLowerCase() === "f"
			? "F"
			: "M"
		: null;

	// Cleaned title
	const cleanedTitle = decodeHTML(
		postData.title.replace(genderRegex, "").trim()
	);

	// Get all images
	let images: Image[] = (post.data.gallery_data?.items || [])
		.map((t) => {
			return {
				url: decodeHTML(post.data.media_metadata?.[t.media_id].s.u),
			};
		})
		.filter((t) => t.url);

	if (images.length === 0) {
		images = (post.data.preview?.images || []).map((t) => {
			return {
				url: decodeHTML(t.source.url),
			};
		});
	}

	const expandedChildData: ExpandedChildData = {
		...postData,
		cleanedTitle,
		madeByGender: gender,
		selftext_html: postData.selftext_html
			? decodeHTML(postData.selftext_html)
			: undefined,
		images,
	};

	return {
		...post,
		data: expandedChildData,
	};
}
