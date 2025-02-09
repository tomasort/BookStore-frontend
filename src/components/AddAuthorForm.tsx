import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/Card"

const AddAuthorForm = () => {
    return (
        <Tabs defaultValue="search" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200">
                <TabsTrigger value="search">Search Author</TabsTrigger>
                <TabsTrigger value="create">Create New Author</TabsTrigger>
            </TabsList>
            <TabsContent value="search">
                <Card>
                    <CardHeader>
                        <CardTitle>Search Existing Authors</CardTitle>
                        <CardDescription>
                            Search for an existing author to add them to the book.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <span>Form for search authors</span>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="create">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Author</CardTitle>
                        <CardDescription>
                            Create a new author to add them to the database and to the book.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <span>Form for create authors</span>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}

export default AddAuthorForm
