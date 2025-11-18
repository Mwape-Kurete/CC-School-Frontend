export const ImageGenServices = {
    async  fetchCourseImage(courseName: string): Promise<string | null> {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(courseName)}&client_id=-w0Mxeriy3vYXzltQux5KvUcV53XgGHuOTEuCLIqZQQ`);
        const data = await response.json();
        return data.results?.[0]?.urls?.regular || null;
    } catch (err) {
        console.error('Image fetch failed:', err);
        return null;
    }
}

}