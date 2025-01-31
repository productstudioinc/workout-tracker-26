import { useState } from "react"
import { RootLayout } from "./components/layout/root"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { ScrollArea } from "./components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Plus, Dumbbell, Calendar, TrendingUp } from "lucide-react"

interface Workout {
  id: string
  name: string
  date: string
  exercises: string[]
}

function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [newWorkoutName, setNewWorkoutName] = useState("")

  const addWorkout = () => {
    if (!newWorkoutName.trim()) return

    const newWorkout: Workout = {
      id: crypto.randomUUID(),
      name: newWorkoutName,
      date: new Date().toISOString().split("T")[0],
      exercises: [],
    }

    setWorkouts([...workouts, newWorkout])
    setNewWorkoutName("")
  }

  return (
    <RootLayout>
      <div className="container mx-auto p-4">
        <Tabs defaultValue="workouts" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="workouts">
              <Dumbbell className="mr-2 h-4 w-4" />
              Workouts
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="progress">
              <TrendingUp className="mr-2 h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workouts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Workout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Workout name"
                    value={newWorkoutName}
                    onChange={(e) => setNewWorkoutName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") addWorkout()
                    }}
                  />
                  <Button onClick={addWorkout}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  {workouts.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                      No workouts yet. Add your first workout above!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {workouts.map((workout) => (
                        <Card key={workout.id}>
                          <CardHeader>
                            <CardTitle className="text-lg">
                              {workout.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {workout.date}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Workout Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground">
                  Calendar view coming soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Workouts
                      </CardTitle>
                      <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{workouts.length}</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RootLayout>
  )
}

export default App