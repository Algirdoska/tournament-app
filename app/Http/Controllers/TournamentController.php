<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Team;
use App\Models\Tournament;
use Illuminate\Http\Request;

class TournamentController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $tournaments = Tournament::all()->load('categories:title', 'teams:name');

        return $tournaments;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'name'=>'required|string',
            'categories'=>'required|array',
        ]);

        $tournament = Tournament::create($request->all());

        foreach ($request->categories as $id) {
            Category::findOrFail($id);
            $tournament->categories()->attach($id);
        }

        $tournament = $tournament->load('categories:title');

        return $tournament;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Tournament $tournament)
    {

        $tournament = $tournament->load('categories:title', 'teams:name');

        return $tournament;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tournament $tournament)
    {
            $request->validate([
                'name'=>'required|string',
                'categories'=>'nullable|array',
                'teams'=>'nullable|array',
            ]);

            $categories=[];
            foreach ($request->categories as $id) {
                Category::findOrFail($id);
                array_push($categories, $id) ;
            }

            $tournament->categories()->sync($categories);


            $teams=[];
            foreach ($request->teams as $id) {
                Team::findOrFail($id);
                array_push($teams, $id) ;
            }

            $tournament->teams()->sync($teams);


            $tournament->update($request->all());

            $tournament = $tournament->load('categories:title', 'teams:name');
            return $tournament;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tournament $tournament)
    {
        $tournament->delete();
    }
}
